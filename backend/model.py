import transformers
from transformers import BloomForCausalLM
from transformers import BloomTokenizerFast
import torch

model = BloomForCausalLM.from_pretrained("bigscience/bloom-560m")
tokenizer = BloomTokenizerFast.from_pretrained("bigscience/bloom-560m")

result_length = 20

def communicate(prompt:str):
    inputs = tokenizer(prompt, return_tensors="pt")
    return tokenizer.decode(model.generate(inputs["input_ids"], 
                            max_new_tokens=result_length,
                            num_beams=2,
                            no_repeat_ngram_size=2,
                            use_cache=True,
                            early_stopping=True,
                            do_sample=True, 
                            )[0])

