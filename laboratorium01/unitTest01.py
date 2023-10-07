#!/usr/bin/python3

import unittest
import skrypt01


MOVES={'f':'Zwierzak idzie do przodu', 'b':'Zwierzak idzie do tyłu', 'l':'Zwierzak skręca w lewo', 'r':'Zwierzak skręca w prawo'}


class Test_displayWorks(unittest.TestCase):
    def test_f_working(self):
        self.assertEqual(skrypt01.run('f', MOVES), [MOVES['f']])
    def test_other_than_fblr(self):
        self.assertListEqual(skrypt01.run(['a', 's', 'w', '!', '@', 'p', 'o', 'k'], MOVES), [])


if __name__ == '__main__':
    unittest.main()
