import PropTypes from 'prop-types';
import '../styles/GlobosStyle.css'


export default function GloboDeTexto(props){
    return (
        
    <div className="globos">
       
        <p className="username" >{props.message}</p>
        <p className="message">{props.username} - {props.hour}</p> 

    </div>
    )
}

GloboDeTexto.propTypes = {
    username: PropTypes.string.isRequired, 
    message: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired, 
  };

