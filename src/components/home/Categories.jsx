
import { Button, Table, TableCell, TableHead, TableRow ,TableBody,styled} from "@mui/material"
import { categories } from "../../constants/data";
import { Link,  useSearchParams } from "react-router-dom";
import { Height } from "@mui/icons-material";


const StyledTable=styled(Table)`
    border: 1px solid rgba(224, 224, 224, 2);
`


const StyleButton=styled(Button)`
    width:85%;
    margin:20px;
    background:rgb(30, 48, 49);
    color:white;

`
const StyledLink=styled(Link)`
    text-decoration:none;
    color:inherit;
`

const Categories=()=>{
    const [searchParams]=useSearchParams();
    const category=searchParams.get('category');

    return(
        <>
        <Link to={`/create?category=${category || ''}`}>
            <StyleButton variant="contained" >
                Share Your Experience
            </StyleButton>
        </Link>
        <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to="/">
                            All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category=>(
                            <TableRow key={category.id} >
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`} >
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
        </StyledTable>
        </>
    )
}

export default Categories;

