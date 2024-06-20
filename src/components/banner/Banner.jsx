
import { Typography, Box, styled} from "@mui/material";
import Logo from'./img.png';


const Image = styled(Box)`
    width: 100%;
    background: url(https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center/68% repeat-x #000;
    height: 57vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom:20px;
`;

const Heading = styled(Typography)`
    font-size: 50px;
    color: #FFFFFF;
    line-height: 1
`;

const Sub = styled(Typography)`
    font-size: 10px;
    font-weight:600;
    background: #FFFFFF;
    margin:2px;
    padding:3px;
`;

const Banner=()=>{
    return (
        // <AspectRatio minHeight={120} maxHeight={200}>
        <Image>
            {/* is wanted to change this vdo num 3 at 56:30 */}
            {/* <img style={{ width: 600, height: 300 }} src={Logo}/> */}
            <Heading>PATH-FINDER</Heading>
            <Sub> Career Path Made Easy. Connect. Learn. Succeed.</Sub>
        </Image>

       
        // </AspectRatio>
    )
}

export default Banner;