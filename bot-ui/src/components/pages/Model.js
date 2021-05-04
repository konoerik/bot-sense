import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import plot from "../images/plot.png";
import conf_norm from "../images/ConfusionMtrx-normalized.png";
import conf_denorm from "../images/ConfusionMtrx-not-normalized.png";
import correlation from "../images/Correlationdata.png";
import decision from "../images/DecisionTree.png";
import roccurve from "../images/ROCCurve.png";
import top5 from "../images/top5features.png";

function Model() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Nav.Link variant="primary" onClick={handleShow}>Model</Nav.Link>
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Model</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Bot vs Non-Bot Plot</h3>
                <p> 
                    The dense or sparsenes of this regular expression plot displays that fact that bot have less friends and ends up following others.
                </p>
                <Image src={plot} alt="logo" width="100%" rounded />  

                <h3>Correlation</h3>
                <p> 
                    Spearman's correlation coefficient, (ρ, also signified by rs) measures the strength and direction of association between two ranked variables.
                    This image provides how each of feature is ranked/weighed against the other. 
                    verified, listed_count, friends_count, followers_count have found to have strong correlation.
                </p> 
                <Image src={correlation} alt="logo" width="100%" rounded />  

                <h3>Top 5 Features by Weight</h3>
                <p> 
                    Among other features, the top 5 featues carrying maximum weight in determining the bot'ness of a user.
                </p>
                <Image src={top5} alt="logo" width="100%" rounded />  

                <h3>Tree Structure</h3>
                <p> 
                    This tree structure defines into how many leafs and depth the classfier went along with feature weightage to arrive at classifying a bot vs non bot
                </p>
                <Image src={decision} alt="logo" width="100%" rounded />  

                <h3>ROC Curve</h3>
                <p> 
                    The ROC curve is plotted with TPR against the FPR where TPR is on the y-axis and FPR is on the x-axis.
                    It is one of the most important evaluation metrics for checking any classification model’s performance.
                    A good ROC curve here indicates that the probability of fidning the bot is high
                </p>
                <Image src={roccurve} alt="logo" width="100%" rounded />  

                <h3>Normalized Confusion Matrix</h3>
                <p>
                    The confusion_matrix function evaluates classification accuracy by computing the confusion matrix with each row corresponding to
                    the true class (Wikipedia and other references may use different convention for axes).
                    By definition, entry in a confusion matrix is the number of observations actually in group , but predicted to be in group .
                </p>
                <Image src={conf_norm} alt="logo" width="100%" rounded />  

                <h3>Denormalized Confusion Matrix</h3>
                <Image src={conf_denorm} alt="logo" width="100%" rounded />  
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
  }

  export default Model;



