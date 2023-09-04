from modules.images_processing import *

img = imread('img/4.jpg')
img = erode(img, seCross3())
#histo = hist(img)
#showhist(histo)
#img = contrast(img, 10, 10)
imshow(img)
print(nchannels(img))
print(size(img))
