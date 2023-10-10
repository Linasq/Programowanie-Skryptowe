#!/usr/bin/python3

import unittest
import skrypt01


class Test_displayWorks(unittest.TestCase):
    def test_f_working(self):
        self.assertEqual(skrypt01.run('f', skrypt01.MOVES), [skrypt01.MOVES['f']])
    def test_other_than_fblr(self):
        self.assertListEqual(skrypt01.run(['a', 's', 'w', '!', '@', 'p', 'o', 'k'], skrypt01.MOVES), [])


if __name__ == '__main__':
    unittest.main()
