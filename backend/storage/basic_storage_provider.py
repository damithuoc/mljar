import os
from config import BASIC_STORAGE_DIR


class BasicStorageProvider(object):
    def __init__(self):
        self.base_dir = BASIC_STORAGE_DIR

    def put(self, data, data_path):
        print("Put", data_path)

    def get(self, data_path):
        print("Get", data_path)
        # do nothing file is already in our scope

    def create_dir(self, destination):
        dst_dir = os.path.join(self.base_dir, destination)
        try:
            os.makedirs(dst_dir)
        except OSError:
            print("Creation of the directory {0} failed".format(dst_dir))

    def get_path(self, destination, filename):
        path = os.path.join(self.base_dir, destination, filename)
        self.create_dir(destination)
        return path
