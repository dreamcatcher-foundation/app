import json
from typing import Any

class Sync:
  def __init__(self, jsonFilePath: str) -> None:
    self.jsonFilePath = jsonFilePath
    self.content = {}
    try:
      with open(self.jsonFilePath, "r") as jsonFile:
        self.content = json.load(jsonFile)
      if len(self.content) != 0:
        for key, value in self.content.items():
          setattr(self, key, value)
    except FileNotFoundError:
      with open(self.content, "w") as jsonFile:
        self.content = json.load(jsonFile)

  def __setattr__(self, __name: str, __value: Any) -> None:
    self.__dict__[__name] = __value
    temporaryDictionary = {}
    with open(self.jsonFilePath, "r") as jsonFile:
      temporaryDictionary = json.load(jsonFile)
    temporaryDictionary[f"{__name}"] = __value
    try:
      with open(self.jsonFilePath, "w") as jsonFile:
        json.dump(temporaryDictionary, jsonFile, indent=2)
    except:
      pass
    finally:
      pass

  def __getattr__(self, __name: str):
    try:
      return self.__getattribute__(__name)
    except AttributeError:
      return setattr(self, __name, None)