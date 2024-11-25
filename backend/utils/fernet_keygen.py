from cryptography.fernet import Fernet

newkey = Fernet.generate_key().decode()
print(newkey)
