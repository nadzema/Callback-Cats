
# import dependencies
from pandas import DataFrame
import pandas as pd
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc, distinct, MetaData, Table
from flask import Flask, jsonify, render_template
from config import password


# Database Setup:

# Create engine 
engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/mlb_db')

# Establisting a connection to our database
conn = engine.connect()

# Reflect an existing database into a new model
Base = automap_base()
# Reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
all_data = Base.classes.all_data

# Flask Setup
app = Flask(__name__)

##################################################################################################
# Flask Routes (FIVE total)
##################################################################################################
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/ba_era_day_night<br/>"
        f"/ba_day<br/>"
        f"/ba_night<br/>"
        f"/era_day<br/>"
        f"/era_night<br/>"
    )


##################################################################################################
# 1.) Route for everything: both batting_avg and earn_run_avg for both day and night games
@app.route("/ba_era_day_night")
def ba_era_day_night():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query both batting_avg and earn_run_avg for both day and night games
    results = session.query(all_data.batting_avg, all_data.earn_run_avg, all_data.day_night).all()

    # Close session
    session.close()

    # Create a dictionary from the row data and append to list ba_era_day_night
    ba_era_day_night_list = []
    for batting_avg, earn_run_avg, day_night in results:
        ba_era_day_night_dict = {}
        ba_era_day_night_dict["batting_avg"] = batting_avg
        ba_era_day_night_dict["earn_run_avg"] = earn_run_avg
        ba_era_day_night_dict["day_night"] = day_night
        ba_era_day_night_list.append(ba_era_day_night_dict)

    # Return a JSON list of both batting_avg and earn_run_avg for both day and night games
    return jsonify(ba_era_day_night_list)


##################################################################################################
# 2.) Route for batting_avg for day games only
@app.route("/ba_day")
def ba_day():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all batting_avg for day games only
    results = session.query(all_data.batting_avg, all_data.day_night).\
              filter(all_data.day_night == 'd')

    # Close session
    session.close()

    # Create a dictionary from the row data and append to list ba_day_list
    ba_day_list = []
    for batting_avg, day_night in results:
        ba_day_dict = {}
        ba_day_dict["batting_avg"] = batting_avg
        ba_day_dict["day_night"] = day_night
        ba_day_list.append(ba_day_dict)

    # Return a JSON list of batting_avg for day games only
    return jsonify(ba_day_list)


##################################################################################################
# 3.) Route for batting_avg for night games only
@app.route("/ba_night")
def ba_night():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all batting_avg for night games only
    results = session.query(all_data.batting_avg, all_data.day_night).\
              filter(all_data.day_night == 'n')

    # Close session
    session.close()

    # Create a dictionary from the row data and append to list ba_night_list
    ba_night_list = []
    for batting_avg, day_night in results:
        ba_night_dict = {}
        ba_night_dict["batting_avg"] = batting_avg
        ba_night_dict["day_night"] = day_night
        ba_night_list.append(ba_night_dict)

    # Return a JSON list of batting_avg for night games only
    return jsonify(ba_night_list)


##################################################################################################
# 4.) Route for earn_run_avg for day games only
@app.route("/era_day")
def era_day():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all earn_run_avg for day games only
    results = session.query(all_data.earn_run_avg, all_data.day_night).\
              filter(all_data.day_night == 'd')

    # Close session
    session.close()

    # Create a dictionary from the row data and append to list era_day_list
    era_day_list = []
    for earn_run_avg, day_night in results:
        era_day_dict = {}
        era_day_dict["earn_run_avg"] = earn_run_avg
        era_day_dict["day_night"] = day_night
        era_day_list.append(era_day_dict)
    
    # Return a JSON list of earn_run_avg for day games only
    return jsonify(era_day_list)


##################################################################################################
# 5.) Route for earn_run_avg for night games only
@app.route("/era_night")
def era_night():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all earn_run_avg for night games only
    results = session.query(all_data.earn_run_avg, all_data.day_night).\
              filter(all_data.day_night == 'n')

    # Close session
    session.close()

    # Create a dictionary from the row data and append to list era_night_list
    era_night_list = []
    for earn_run_avg, day_night in results:
        era_night_dict = {}
        era_night_dict["earn_run_avg"] = earn_run_avg
        era_night_dict["day_night"] = day_night
        era_night_list.append(era_night_dict)

    # Return a JSON list of earn_run_avg for night games only
    return jsonify(era_night_list)


#Debug
if __name__ == '__main__':
    app.run(debug=True)



