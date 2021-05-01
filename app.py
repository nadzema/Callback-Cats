
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
# Flask Routes 
##################################################################################################
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about.html")
def about():
    return render_template("/about.html")

@app.route("/map.html")
def map():
    return render_template("/map.html")

@app.route("/teams.html")
def teams():
    return render_template("/teams.html")

@app.route("/batting_avg.html")
def batting_avg():
    return render_template("/batting_avg.html")

@app.route("/earn_run_avg.html")
def earn_run_avg():
    return render_template("/earn_run_avg.html")

@app.route("/pie_charts.html")
def pie_charts():
    return render_template("/pie_charts.html")




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


##################################################################################################
# 6.) Route for both avgerage batting_avg and average earn_run_avg for both day and night games for each team
@app.route("/team_avg")
def team_avg():

    # Create our session (link) from Python to the DB
    session = Session(engine)
    
    # Query each team's average batting average and average era
    results = session.query(all_data.team_name, func.avg(all_data.batting_avg), func.avg(all_data.earn_run_avg), all_data.day_night).\
    group_by(all_data.team_name, all_data.day_night).all()

    # Close session
    session.close()
    # Create a dictionary from the row data and append to list team_avg_list
    team_avg_list = []
    for team_name, batting_avg, earn_run_avg, day_night in results:
        team_avg_dict = {}
        team_avg_dict["team_name"] = team_name
        team_avg_dict["batting_avg"] = round(batting_avg, 3)
        team_avg_dict["earn_run_avg"] = round(earn_run_avg, 2)
        team_avg_dict["day_night"] = day_night
        team_avg_list.append(team_avg_dict)
    # Return a JSON list of both avgerage batting_avg and average earn_run_avg for both day and night games for each team
    return jsonify(team_avg_list)
 


##################################################################################################
# 7.) Route for both avgerage batting_avg and average earn_run_avg for both day and night games for each team's home games only
@app.route("/home_avg")
def home_avg():

    # Create our session (link) from Python to the DB
    session = Session(engine)
    # Query each team's average batting average and average era and venue, filter venue by home games only
    results = session.query(all_data.team_name, all_data.venue, func.avg(all_data.batting_avg), func.avg(all_data.earn_run_avg)).\
            group_by(all_data.team_name, all_data.venue).\
                filter(all_data.venue == 'Home').all()

    # Close session
    session.close()
    # Create a dictionary from the row data and append to list home_avg_list
    home_avg_list = []
    for team_name, venue, batting_avg, earn_run_avg in results:
        home_avg_dict = {}
        home_avg_dict["team_name"] = team_name
        home_avg_dict["venue"] = venue
        home_avg_dict["batting_avg"] = round(batting_avg, 3)
        home_avg_dict["earn_run_avg"] = round(earn_run_avg, 2)
        
        home_avg_list.append(home_avg_dict)
        
    # Return a JSON list of both avgerage batting_avg and average earn_run_avg for both day and night games for each team's home games only
    return jsonify(home_avg_list)

#Debug
if __name__ == '__main__':
    app.run(debug=True)



