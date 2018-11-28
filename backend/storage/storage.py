from storage.basic_storage_provider import BasicStorageProvider


class Storage(object):
    def __init__(self):
        self.provider = BasicStorageProvider()

    def put(self, data, data_path):
        return self.provider.put(data, data_path)

    def get(self, data_path):
        return self.provider.get(data_path)

    def get_path(self, destination, filename):
        return self.provider.get_path(destination, filename)
