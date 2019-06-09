import subprocess

import unittest


class Tests(unittest.TestCase):
    def test_mecab(self):
        test_input = '蒼い風がいま'
        test_output = '蒼い 風 が いま'  # from mecab in CLI

        output = mecab(test_input)
        self.assertEqual(output, test_output)

    def test_kakasi_romanji(self):
        test_input = '蒼い風がいま'
        test_output = 'aoi kaze ga ima'

        output = run_kakasi(test_input)

        self.assertEqual(output, test_output)

    def test_wa_ha_romanji(self):
        # in japanese, wa is usually spelt with the hiragana for ha
        # which kakasi doesn't seem to handle automatically..

        test_input = 'わたしのなまえはあさみです'
        test_output = 'watashi no namae wa asami desu'

        output = run_kakasi(test_input)
        self.assertEqual(output, test_output)


def mecab(text_input):
    '''
    Start an instance of mecab to parse Japanese input
    and output a bunch of words.
    In: strings
    Out: also strings.
    '''
    mecab = '/usr/bin/mecab'
    opts = '-O', 'wakati'

    mecab_proc = subprocess.run(args=[mecab, *opts],
                                input=text_input,
                                encoding='utf-8',
                                stdout=subprocess.PIPE)

    if mecab_proc.returncode == 0:
        return mecab_proc.stdout.strip()
    else:
        return None


conv = None


def run_kakasi(text_input):
    global conv

    if not conv:
        # kakasi set up from the pip page for this module.
        # using only setMode(J, a), (r, Hepburn) (s, False) opts
        # is buggy  ¯\_(ツ)_/¯

        from pykakasi import kakasi

        kakasi = kakasi()
        kakasi.setMode("H", "a")  # Hiragana to ascii, default: no conversion
        kakasi.setMode("K", "a")  # Katakana to ascii, default: no conversion
        kakasi.setMode("J", "a")  # Japanese to ascii, default: no conversion
        kakasi.setMode("r", "Hepburn")  # default: use Hepburn Roman table
        kakasi.setMode("s", False)  # add space, default: no separator
        conv = kakasi.getConverter()

    # Use mecab instead of kakasi's wakati feature
    # to do spacing between Japanese kanji
    # because mecab has better spacing prediction
    spaced = mecab(text_input)
    chars = spaced.split(' ')

    def replacer(word): return 'わ' if word == 'は' else word
    spaced = ' '.join(list(map(replacer, chars)))

    result = conv.do(spaced)
    return result


if __name__ == '__main__':
    unittest.main()
