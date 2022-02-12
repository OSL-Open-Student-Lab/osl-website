import unittest
import app

class BasicTestCase(unittest.TestCase):

    def test_index(self):
        test_user = app.test_client(self)
        response = test_user.get("api/v1")
        print("[RESPONSE]: ",response)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data)

if __name__ == "__main__":
    unittest.main()
