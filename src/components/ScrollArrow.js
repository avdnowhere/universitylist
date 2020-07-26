import React, {useState} from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import '../App.css';

const ScrollArrow = () =>{
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false)
        }
    };

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <ExpandLessIcon 
            fontSize="large"
            className="scrollTop"
            onClick={scrollTop}
            style={{height: 40, display: showScroll ? 'flex' : 'none'}}
        />
    )
}

export default ScrollArrow;