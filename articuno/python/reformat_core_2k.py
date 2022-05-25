import re

# https://ankiweb.net/shared/info/2141233552
# no media Anki .txt export of the Core 2000 deck from above link
core_2k = open('../assets/anki_core_2k.txt', 'rt')

# manual changes made to anki_core_2k before running
# removed "大辞林ウィズダム類語辞典EBPocketjishoweblio" from every single line because it means nothing
# line answers were wrapped in double quotations if they contained an apostrophe - removed all double quotations

def reformat_question(q):
  word = q[0]
  example = q[-1].strip('\t').strip('\n')
  q.remove(word)
  q.remove(example)
  pos = ' '.join(q)

  return [word, pos, example]

# get definition(s) from a, which appear before the Japanese
# get translation of example, which appears after the Japanese
# get frequency of word which appears at the end of the incoming list
# return definition(s), translation of example, and frequency
def reformat_answer(a):
  freq = a[-1]
  a.remove(freq)
  a.pop() # get rid of random blank space now at the end
  freq = freq.strip('\n').strip('\w')
  defs = ''
  
  # loop over remaining elements in `a` until Japanese text appears
  # these will be the definitions
  while re.match(r'^[a-zA-Z0-9,.\(\)\-\'\xf6-\xf8\xe5]*$', a[0]):
    new_def = a.pop(0)
    if (len(defs) > 0): # prevent white space at beginning
      new_def = ' ' + new_def # restores original definitions with spacing
    defs += new_def

  words_in_example_translation = []
  # `a` now contains Japanese text, maybe Japanese text, and translation
  # reverse the list, repeat the step above, this will result in the translation
  a.reverse()
  while re.match(r'^[a-zA-Z0-9,.\(\)\-\'\xf6-\xf8\xe5]*$', a[0]):
    word = a.pop(0)
    words_in_example_translation.append(word)

  a.reverse()
  japanese_with_reading = ''.join(a)
  # reverse the list to get the translation in the correct order
  words_in_example_translation.reverse()
  # join translation so it's a single string
  example_translation = ' '.join(words_in_example_translation)
  # same for defs, but join by comma
  return [defs, japanese_with_reading, example_translation, freq]

def build_new_core_2k(cards):
  # create new file
  new_core_2k = open(r'../assets/aozora_core_2k.csv', 'w')
  
  cursor = 0
  # write cards to file line by line
  for card in cards:
    c = card
    # if the cursor isn't at the end of the list, append a newline to card
    if cursor != len(cards) - 1:
      c = c + '\n'
    new_core_2k.write(c)
    cursor += 1

  # save changes
  new_core_2k.close()

cards = []
for line in core_2k:
  qa = line.split("\t")
  q = qa[0].split(" ")
  a = qa[1].split(" ")
  # [0] = word, part of speech, example
  # [1] = english definition, example with furigana, example translated, useless jisho thing, frequency, linebreak
  
  # join question and answer by a tab character
  question = reformat_question(q)
  question = '\t'.join(question)
  answer = reformat_answer(a)
  answer = '\t'.join(answer)
  
  # join question and answer by a Japanese dollar sign
  # since this character doesn't appear anywhere in the cards and it's easy to break q and a apart by
  card = f"{question}＄{answer}"
  cards.append(card)

build_new_core_2k(cards)
