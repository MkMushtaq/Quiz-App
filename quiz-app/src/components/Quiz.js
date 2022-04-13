import React from "react";

function Quiz(props) {
  return (
    <div>
      {props.questions.map((q) => {
        return (
          <Card className="m-4">
            <Card.Header>{q.question}</Card.Header>
            <Card.Body>
              <Button
                variant="danger"
                className="m-3"
                onClick={() => setOption(q.num, "Strongly Disagree")}
              >
                Strongly Disagree
              </Button>
              <Button
                variant="primary"
                className="m-3"
                onClick={() => setOption(q.num, "Disagree")}
              >
                Disagree
              </Button>
              <Button
                variant="primary"
                className="m-3"
                onClick={() => setOption(q.num, "Slightly Disagree")}
              >
                Slightly Disagree
              </Button>
              <Button
                variant="primary"
                className="m-3"
                onClick={() => setOption(q.num, "Neutral")}
              >
                Neutral
              </Button>
              <Button
                variant="primary"
                className="m-3"
                onClick={() => setOption(q.num, "Slightly Agree")}
              >
                Slightly Agree
              </Button>
              <Button
                variant="primary"
                className="m-3"
                onClick={() => setOption(q.num, "Agree")}
              >
                Agree
              </Button>
              <Button
                variant="success"
                className="m-3"
                onClick={() => setOption(q.num, "Strongly Agree")}
              >
                Strongly Agree
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default Quiz;
