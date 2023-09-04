from flask import Blueprint, send_file
from flask import jsonify
from modules.images_processing_api import *
import os

images_bp = Blueprint('images', __name__)

@images_bp.route('/all')
def get_all_images():
    image_info_list = []
    image_folder = 'img' 
    
    for filename in os.listdir(image_folder):
        if filename.endswith('.jpg'):
            image_name = (filename.split('.')[0])
            image_url = f'https://image-api.josedhonatas.ninja/images/{image_name}'         
            image_info = {
                'image_name': image_name,
                'image_url': image_url
            }
            image_info_list.append(image_info)
    
    return jsonify(image_info_list)

@images_bp.route('/<string:image_name>')
def get_image(image_name):
    image_path = f'img/{image_name}.jpg'
    img = imread(image_path)
    image = imshow(img)
    return send_file(image, mimetype='image/png')

@images_bp.route('/negative/<string:image_name>')
def get_negative_image(image_name):
    image_path = f'img/{image_name}.jpg'
    img = imread(image_path)
    img = negative(img)
    image = imshow(img)
    return send_file(image, mimetype='image/png')

@images_bp.route('/thresh/<string:image_name>')
def get_thresh_image(image_name):
    image_path = f'img/{image_name}.jpg'
    img = imread(image_path)
    img = thresh(img, 130)
    image = imshow(img)
    return send_file(image, mimetype='image/png')

@images_bp.route('/gray/<string:image_name>')
def get_gray_image(image_name):
    image_path = f'img/{image_name}.jpg'
    img = imreadgray(image_path)
    image = imshow(img)
    return send_file(image, mimetype='image/png')

@images_bp.route('/histeq/<string:image_name>')
def get_histeq_image(image_name):
    image_path = f'img/{image_name}.jpg'
    img = imread(image_path)
    img_histeq = histeq(img)
    img_out = imshow(img_histeq)
    return send_file(img_out, mimetype='image/png')

@images_bp.route('/blur/<string:image_name>')
def get_blur_image(image_name):
    image_path = f'img/{image_name}.jpg'
    image = imread(image_path)
    image_blur = blur(image)
    image_out = imshow(image_blur)
    return send_file(image_out, mimetype='image/png')

@images_bp.route('/erode/<string:image_name>')
def get_erode_image(image_name):
    image_path = f'img/{image_name}.jpg'
    image = imread(image_path)
    element = seCross3()
    image_erode = erode(image, element)
    image_out = imshow(image_erode)
    return send_file(image_out, mimetype='image/png')

@images_bp.route('/dilate/<string:image_name>')
def get_dilate_image(image_name):
    image_path = f'img/{image_name}.jpg'
    image = imread(image_path)
    element = seCross3()
    image_dilate = dilate(image, element)
    image_out = imshow(image_dilate)
    return send_file(image_out, mimetype='image/png')


