import flask

app = flask.Flask(__name__)

@app.route("/")
def index():
  return flask.render_template("./index.html")

@app.route("/dashboard")
def dashboard():
  return "Coming Soon"

if __name__ == "__main__":
  app.run(debug=True)
  