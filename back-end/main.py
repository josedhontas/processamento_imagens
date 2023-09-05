from modules.images_processing import *

img = imreadgray('img/lenna_gray.jpg')
#img = dilate(img, seCross3())
#histo = hist(img)
#showhist(histo)
#contrast(img, 10, 10)
imshow(img)
print(nchannels(img))
print(size(img))
