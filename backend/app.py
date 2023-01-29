from flask import Flask, render_template, url_for, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt
from model import communicate

# Initialization of the flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'testsecretkey'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


# instantiate the login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


"""load a user from user id

Returns:
    User: return current user 
"""
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


"""Main User class to instantiate the User table in the db

Returns:
    boolean: if the user is well created or not
"""
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    
"""Main Message class to instantiate the Message table in the db

Returns:
    boolean: if the message is well created or not
"""
class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    chat_id = db.Column(db.ForeignKey("chats.id"), nullable=False)
    msg = db.Column(db.String(200), nullable=False)
    output = db.Column(db.String(), nullable=False)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    
"""Main Chat class to instantiate the Chat table in the db

Returns:
    boolean: if the chat is well created or not
"""
class UserChat(db.Model):
    __tablename__ = "chats"
    user_id = db.Column(db.ForeignKey("user.id"))
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    #message_id = db.Column(db.ForeignKey("messages.id"), nullable=True)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
            
def validate_username(username):
    existing_user_username = User.query.filter_by(
        username=username).first()
    if existing_user_username:
        raise ValidationError(
            'That username already exists. Please choose a different one.')
    return True


""" Route to login from the vue app, takes username and password and check validity

Returns:
    dict: dict containing user infos (if login success)
"""
@app.route('/api/login', methods=['GET', 'POST'])
def login():
    username = request.args.get('username')
    passwd = request.args.get('password')
    print(username, passwd)
    user = User.query.filter_by(username=username).first()
    if user:
        if bcrypt.check_password_hash(user.password, passwd):
            login_user(user)
            return {
            'id':current_user.id,
            'username':current_user.username,
            }
    return {
            'id':0,
            'username':'guest',
            }

"""Route to logout from the vue app

Returns:
    boolean: show if the logout success
"""
@app.route('/api/logout', methods=['GET', 'POST'])
def logout():
    if current_user.is_authenticated:
        logout_user()
        return {'validation': True}
    return {'validation': False}
        
    

"""Route to register from the vue app, password is encrypted in the db

Returns:
    boolean: true if well registered
"""
@ app.route('/api/register', methods=['GET', 'POST'])
def register():
    username = request.args.get('username')
    passwd = request.args.get('password')
    print(username, passwd)
    if validate_username(username):
        print("username valid")
        hashed_password = bcrypt.generate_password_hash(passwd)
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return {'validation': True}
    return {'validation': False}

"""Route to create a new chat in the db

Returns:
    int: int corresponding to the current chat ID
"""
@app.route('/api/nwchat', methods=['GET', 'POST'])
def new_chat():
    user_id = request.args.get('user-id')
    nchat = UserChat(user_id=user_id)
    db.session.add(nchat)
    db.session.commit()
    return {'chatId': nchat.id}
    
"""Route to create a new message in the db
Chats and messages are both links to the logged in user

Returns:
    int: int corresponding to the current message ID
"""
@app.route('/api/nwmessage', methods=['GET', 'POST'])
def new_message():
    req = request.get_json()
    user_id = req['user-id']
    chat_id = req['chat-id']
    msg = req['message']
    conversation = req['conversation']
    conversation = conversation[:-3]
    temp = ""
    for elem in conversation:
        temp += "Q: "+ elem['message'] + "\nA: " + elem['output'] + "\n"
    temp += "Q: " + msg + "\nA: "
    buff = communicate(temp)
    nmsg = Message(msg=msg, chat_id=chat_id, output=buff)
    db.session.add(nmsg)
    db.session.commit()
    return {'response': buff.split("A: ")[-1]}
    
"""Route to delete chat in the db

Returns:
    boolean: if well delete
"""
@app.route('/api/dchat', methods=['GET', 'POST'])
def delete_chat():
    user_id = request.args.get('user-id')
    chat_id = request.args.get('chat-id')
    UserChat.query.filter(UserChat.user_id == user_id, UserChat.id == chat_id).delete()
    Message.query.filter(Message.chat_id == chat_id).delete()
    db.session.commit()
    return {'validation':True}
    
"""Route to delete message in the db

Returns:
    boolean: if well delete
"""
@app.route('/api/dmessage', methods=['GET', 'POST'])
def delete_message():
    message_id = request.args.get('message_id')
    Message.query.filter(Message.id >= message_id).delete()
    db.session.commit()
    return {'validation':True}
    
"""Route to get the current user

Returns:
    Chats: all the chats containing corresponding messages, they are use in history when logged in
"""
@app.route('/api/current_user', methods=["GET","POST"])
def get_current_user():
    chats = []
    for chat in UserChat.query.filter(UserChat.user_id == current_user.id).all():
        buff = chat.as_dict()
        buff['messages'] = []
        for message in Message.query.filter(Message.chat_id == chat.id).all():
            buff['messages'].append(message.as_dict())
        chats.append(buff)

    return {"chats" : chats}

if __name__ == "__main__":
    app.run(port=4000, debug=True)
