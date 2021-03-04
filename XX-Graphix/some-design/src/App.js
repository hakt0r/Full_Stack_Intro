import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  IconButton,
  Container,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";
import { MdSearch } from "react-icons/md";
import categories from "./categories";

const useStyles = makeStyles( theme => ({
  logo: {
    marginBottom: '1rem'
  },
  main: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  searchField : {
    "&> div": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      paddingTop: 4
    },
    "& svg": {
      fill: theme.palette.primary.main,
      width: 30,
      height: 30,
      position: 'relative',
      top: -3
    },
    "& fieldset": {
      borderColor: theme.palette.secondary.main,
      borderRight: 0
    },
    "&:hover fieldset.MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderTop: `1px solid ${theme.palette.primary.main}`,
      borderLeft: `1px solid ${theme.palette.primary.main}`,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    }
  },
  selectField : {
    "&> div": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingTop: 4
    },
    "& fieldset": {
      borderColor: theme.palette.secondary.main,
      borderLeft: 0
    },
    "& #category": {
      color: theme.palette.primary.main
    },
    "& svg": {
      color: theme.palette.primary.main
    },
    "&:hover fieldset.MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderTop: `1px solid ${theme.palette.primary.main}`,
      borderRight: `1px solid ${theme.palette.primary.main}`,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    }
  },

}));

function App() {
  const [category, setCategory] = useState(0);
  const classes = useStyles();
  return (
    <Container className={classes.main}>
      <img src={logo} className={classes.logo} alt="logo" />
      <div>
        <TextField
          className={classes.searchField}
          variant="outlined"
          placeholder="Suchen..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch/>
              </InputAdornment>
            ),
          }}
        />
        <FormControl className={classes.selectField}>
          <Select variant="outlined"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.entries(categories).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>
    </Container>
  );
}

export default App;
