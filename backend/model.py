import transformers
from transformers import BloomForCausalLM
from transformers import BloomTokenizerFast
import torch

model = BloomForCausalLM.from_pretrained("bigscience/bloom-560m")
tokenizer = BloomTokenizerFast.from_pretrained("bigscience/bloom-560m")

result_length = 50

def communicate(prompt:str):
    inputs = tokenizer(prompt, return_tensors="pt")
    return tokenizer.decode(model.generate(inputs["input_ids"], 
                           max_length=result_length
                                                 )[0])

# print(tokenizer.decode(model.generate(inputs["input_ids"],
#                         max_length=result_length, 
#                         num_beams=2, 
#                         no_repeat_ngram_size=2,
#                         early_stopping=True
#                         )[0]))

# print(tokenizer.decode(model.generate(inputs["input_ids"],
#                       max_length=result_length, 
#                       do_sample=True, 
#                       top_k=50, 
#                       top_p=0.9
#                       )[0]))
