import sys
from .tilescad.DrawCanvasDebug import draw_flattish_canvas
from flask import Blueprint, send_from_directory, request
from .util import get_current_time_ms, mkdir

api = Blueprint('api', __name__)

TEMP_DIRECTORY = "temp"
# mkdir(TEMP_DIRECTORY)


@api.route('/')
def index():
    return "called api!"


@api.route('/upload-design', methods=['POST'])
def upload_design():
    data = request.get_json()
    print(f"got data {data}")

    k_len = 6
    canvas_dim = 16
    design = draw_flattish_canvas(k_len, canvas_dim, f'k{k_len}')
    filename = f'canvas_design_{round(get_current_time_ms()*10000)}.json'
    design.write_scadnano_file(directory=TEMP_DIRECTORY, filename=filename)

    return filename


@api.route('/download-file', methods=['POST'])
def download_file():
    filename = request.form['filename']
    print(f"got filename {filename}")

    return send_from_directory(TEMP_DIRECTORY, path=filename, as_attachment=True)