import ImageBackground from "../app/Img/inageBackground"

const HomeAfterLogin=()=>{
    return(
    <>
    <ImageBackground imageName="welcome.jpg">
    <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                flexDirection: 'column'
            }}></div>
    </ImageBackground>
    </>)
}
export default HomeAfterLogin