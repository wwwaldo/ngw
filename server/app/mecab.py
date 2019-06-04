from threading import Thread
import subprocess

import unittest


class Tests(unittest.TestCase):
    def test_mecab(self):
        test_input = '蒼い風がいま'
        test_output = '蒼い 風 が いま'  # from mecab in CLI

        output = mecab(test_input)
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


if __name__ == '__main__':
    unittest.main()
