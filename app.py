from flask import Flask, render_template, request
from datetime import datetime
from pytz import timezone

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    # Set the default timezone to Kolkata
    kolkata_tz = timezone('Asia/Kolkata')
    current_time = datetime.now(kolkata_tz).strftime('%H:%M:%S')
    current_date = datetime.now(kolkata_tz).strftime('%Y-%m-%d')

    # List of timezones for the dropdown
    timezones = [
    'Asia/Kolkata', 
    'America/New_York', 
    'Europe/London', 
    'Asia/Tokyo', 
    'Australia/Sydney', 
    'Europe/Berlin', 
    'America/Los_Angeles', 
    'Asia/Shanghai', 
    'America/Chicago', 
    'Europe/Paris', 
    'Asia/Singapore', 
    'America/Toronto', 
    'Europe/Moscow', 
    'Asia/Hong_Kong', 
    'America/Miami', 
    'Africa/Johannesburg', 
    'Asia/Seoul', 
    'Europe/Madrid', 
    'America/Vancouver', 
    'Pacific/Auckland'
]

    
    selected_timezone = 'Asia/Kolkata'  # Default timezone
    
    # Check if the request method is POST
    if request.method == 'POST':
        selected_timezone = request.form.get('timezone')  # Get the selected timezone
        current_time = datetime.now(timezone(selected_timezone)).strftime('%H:%M:%S')
        current_date = datetime.now(timezone(selected_timezone)).strftime('%Y-%m-%d')

    return render_template('index.html', current_time=current_time, current_date=current_date, timezones=timezones, selected_timezone=selected_timezone)

if __name__ == '__main__':
    app.run(debug=True)
