
import sys
import Crypto
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES
# , PKCS1_OAEP
from Crypto import Random
from base64 import b64decode

# x = [True]*(sys.int)


srcData = 'To be, or not to be - that is the question.'
srcData = str.encode(srcData)
print("This is the data\n" + srcData.decode())


# generates the RSA keypair by the number of Bytes
key = RSA.generate(1024)


#### PUBLIC KEY ####
# Public Key to be sent to the Client. -> exported to a PEM File for now
"""
publicKey = key.publickey()
publicKey = publicKey.exportKey("PEM")

print('This is the public key\n', publicKey)

# writing to a pem file
public_key = open("publickey.pem", "w")
public_key.write(publicKey.decode()) # decode converts the bytes to a string #
public_key.close()

# NEEDS TO READ THIS FROM FILE IN ORDER TO ENCRYPT
publicKey = RSA.importKey(open("publickey.pem").read())

# ENCRYPTS THE PLAINTEXT WITH PUBLIC KEY
cipher_rsa = PKCS1_OAEP.new(publicKey)
encryptedData = cipher_rsa.encrypt(srcData)

# WE CAN SEND THE PEM FILE OVER TO THE CLIENT
print("This is the Encrypted Data", srcData)



####  PRIVATE KEY ####
# Private Key to be sent to the Client. -> exported to a PEM File for now
privateKey = key.exportKey("PEM")

# writing to a pem file
private_key = open("privatekey.pem", "w")
private_key.write(privateKey.decode()) # decode converts the bytes to a string #
private_key.close()


"""

# private_key = RSA.importKey(open('privatekey.pem').read())


cipher = RSA.importKey(open('privatekey.pem').read())
print("this is new cipher", cipher)


encryptedText = open("message.txt", encoding='utf8').read()
encryptText = str.encode(encryptedText, 'utf-8')
print(type(encryptText))


decrypted_message = cipher.decrypt(b64decode(encryptText))
text = (decrypted_message.decode('latin-1'))
print('This is the message \n\n', text)


