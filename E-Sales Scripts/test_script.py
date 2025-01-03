from itertools import product
import requests
import base64
import tempfile
import openpyxl
import os

def run_some_function(data):
    encoded_files = []
    # Process the data received from the Flask API and return a result
    for i in range(len(data['selectedProductIds'])):
        base64_data = data['buyer']['pythonScript']
        decoded_data = base64.b64decode(base64_data)
        with tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx') as temp_file:
            temp_file.write(decoded_data)
            temp_file_path = temp_file.name

        wb = openpyxl.load_workbook(temp_file_path)
        sheet = wb.active

        product_id = data['selectedProductIds'][i]['product']['id']
        java_box_url = f'http://localhost:8080/product-box/product/{product_id}'
        java_display_url = f'http://localhost:8080/product-display/product/{product_id}'
        response_box = requests.get(java_box_url)
        response_display = requests.get(java_display_url)

        box = response_box.json()
        if response_display.status_code == 200:
            display = response_display.json()

        sheet['H5'] = box['product']['name']
        sheet['O8'] = box['product']['barcode']
        sheet['Y8'] = box['box_barcode']
        sheet['AY8'] = box['product']['price']
        sheet['BF20'] = box['product']['weight']
        sheet['BF21'] = box['product']['height']
        sheet['BF22'] = box['product']['width']
        sheet['BF23'] = box['product']['length']
        sheet['A8'] = box['product']['reference']
        sheet['S3'] = box['product']['brand']
        sheet['AH3'] = box['product']['ncm']
        sheet['AS3'] = box['product']['cest']
        sheet['BF15'] = box['product']['ipi']
        sheet['F20'] = box['box_weight']
        sheet['F21'] = box['box_height']
        sheet['F22'] = box['box_width']
        sheet['F23'] = box['box_length']
        sheet['M16'] = box['box_quantity']
        if response_display.status_code == 200:
            sheet['AR20'] = display['product']['weight']
            sheet['AR21'] = display['product']['height']
            sheet['AR22'] = display['product']['width']
            sheet['AR23'] = display['product']['length']
            sheet['AJ8'] = display['display_barcode']
            sheet['AU8'] = display['display_quantity']

        wb.save(temp_file_path)

        with open(temp_file_path, 'rb') as file:
            encoded_file = base64.b64encode(file.read()).decode('utf-8')
            encoded_files.append(encoded_file)
            print(len(encoded_files))

        os.remove(temp_file_path)
    return encoded_files

