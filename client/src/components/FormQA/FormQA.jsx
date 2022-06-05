import axios from 'axios';
import React, { useState } from 'react'
import { useStore } from '../../context/store';
import {useHistory} from "react-router-dom";

export const FormQA = ({productId}) => {
    const [data, setData] = useState({
        question: "",
    });
    const [state] = useStore();
    const history = useHistory()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        // console.log("data:", data)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { question } = data;
        if(!state.user) {
            alert("You must be logged In to ask questions")
            history.push("/login")
            return
        }
        try {
            // console.log("productId:", productId)
            await axios.post(`${process.env.REACT_APP_DOMAIN}/qa/${productId}/question`, {
                question,
                userId:state.user
            });
            // console.log("axios:", data)
            alert('Question posted')
            window.location.reload();
        } catch (err) {
            alert(err);
        }
    };
    
    return (
        <div>
            <h4>Ask a question to the seller</h4>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="divInputQuestuion">
                    <input
                        type="text"
                        name="question"
                        placeholder="Ask a question"
                        onChange={(e)=> handleChange(e)}
                        value={data.question}
                    />
                </div>
                <div className="btn-question">
                    <input type="submit" value="Ask Your Question" className="input-submit" />
                </div>
            </form>
        </div>
    )
}

