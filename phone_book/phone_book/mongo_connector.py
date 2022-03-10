from bson import ObjectId
from pymongo import MongoClient

from phone_book.settings import DEFAULT_GRIDFS_URL, DEFAULT_GRIDFS_COLLECTION

client = MongoClient(DEFAULT_GRIDFS_URL)
db = client[DEFAULT_GRIDFS_COLLECTION]

files = db["phone_book.files"]
chunks = db["phone_book.chunks"]


def delete_image(title):
    image_id = files.find_one({"filename": title})["_id"]
    files.delete_one({"_id": ObjectId(image_id)})
    chunks.delete_one({"files_id": ObjectId(image_id)})
