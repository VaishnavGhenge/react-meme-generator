import React from "react"
import response from "../data"

function Meme() {
    const data = response.data.memes;
    // const memeObj = Math.floor(Math.random() * data.length)
    const [meme, setMeme] = React.useState({topText:"", bottomText:"", image:"/memeimg.png"})
    const [allMemes, setAllMemes] = React.useState([])

    function handleSubmit(event) {
        const memeObj = Math.floor(Math.random() * data.length)
        setMeme(obj => ({...obj, image:data[memeObj].url}))

        event.preventDefault()
    }

    function handleChange(event) {
        const {value, name} = event.target

        setMeme(data => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch('https://api.imgflip.com/get_memes')
            const data = await res.json()
            setAllMemes(data.data.memes)
        }

        getMemes()
    }, [])

    // console.log('component redered')

    return (
        <div className="meme">
            <form onSubmit={handleSubmit}>
                <div className="form-div">
                <div className="input-div">
                    <input
                        type="text"
                        className="inp"
                        onChange={handleChange}
                        name="topText"
                        value={meme.topText}
                    />
                    <input
                        type="text"
                        className="inp"
                        onChange={handleChange}
                        name="bottomText"
                        value={meme.bottomText}
                    />
                </div>
                <button className="btn">Get a new meme image 💌</button>
                </div>
            </form>
            <div className="memediv">
                <img src={meme.image} className="meme-img" />
                <h2 className="img-text top">{meme.topText}</h2>
                <h2 className="img-text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    )
}

export default Meme;