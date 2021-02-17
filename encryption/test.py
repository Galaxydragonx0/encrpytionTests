
import sys
import Crypto
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP
#
from Crypto import Random
from base64 import b64decode

# x = [True]*(sys.int)


srcData = 'To be, or not to be - that is the question.'
srcData = srcData.encode()

"""
srcData = str.encode(srcData)
print("This is the data\n" + srcData.decode())
"""
"""
# generates the RSA keypair by the number of Bytes
key = RSA.generate(1024)


#### PUBLIC KEY ####
# Public Key to be sent to the Client. -> exported to a PEM File for now

publicKey = key.publickey()
publicKey = publicKey.exportKey()

print('This is the public key\n', publicKey)

# writing to a pem file
public_key = open("publickey.pem", "wb")
public_key.write(publicKey) # decode converts the bytes to a string #
public_key.close()

# NEEDS TO READ THIS FROM FILE IN ORDER TO ENCRYPT
publicKey = RSA.importKey(open("publickey.pem").read())
print(type(publicKey))
pubkey = PKCS1_OAEP.new(key)
# print("This is the pubkey from file", pubkey)


# ENCRYPTS THE PLAINTEXT WITH PUBLIC KEY
cipher_rsa = PKCS1_OAEP.new(publicKey)
encryptedData = cipher_rsa.encrypt(srcData)

# WE CAN SEND THE PEM FILE OVER TO THE CLIENT
print("This is the Encrypted Data", encryptedData)



####  PRIVATE KEY ####
privateKey = key.exportKey()

# writing to a pem file
private_key = open("privatekey.pem", "w")
private_key.write(privateKey.decode()) # decode converts the bytes to a string #
private_key.close()

privkey = RSA.importKey(open('privatekey.pem').read())
privateCipher = PKCS1_OAEP.new(privkey)
message = privateCipher.decrypt(encryptedData)

print('this is the decrypted messaage', message.decode())
"""

#### Decrpyting from CLIENT ####

# Treads private key from file
privkey = RSA.importKey(open('privatekey.pem').read())
# creates a new cipher of type PKCS!
privateCipher = PKCS1_OAEP.new(privkey)

# reads the message from the client in the text file
encryptedText = open("message.txt").read()
# checks to see if it is a bytes array
print(type(encryptedText))

# since message in forge was encodeed in b64 we have to encode the string message
# and then decode it from b64
b64_decrypted_message = b64decode(encryptedText.encode())

# cipher.decrypt requires a byte array so we use this to ensure it is bytes
print(type(b64_decrypted_message))

# we decrypt the message with the cipher from the private key
decryptedMesasge = privateCipher.decrypt(b64_decrypted_message)

# outputs the message from the client
print('This is the message \n\n', decryptedMesasge.decode())


