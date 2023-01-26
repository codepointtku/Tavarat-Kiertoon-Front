import testData from "../TestData/announcement.json"


function Announcements(){
    const test = JSON.stringify(testData)

    return(
        <h1>{test}</h1>
    )
}

export default Announcements