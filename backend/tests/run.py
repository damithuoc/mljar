import unittest

# they should work like charm :)
# REST API tests
# from test_accounts import TestAccounts
# from test_projects import TestProjects
# from test_basic_upload import TestBasicUpload
# from test_file_data_source import TestFileDataSource
# from test_mlexperiment import TestMLExperiment
# from test_mlmodel import TestMLModel

# worker tests
from tests.tests_worker.test_process_uploaded_file import TestProcessUploadedFile


if __name__ == "__main__":
    unittest.main()
