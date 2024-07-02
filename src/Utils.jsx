import { FontAwesome } from '@expo/vector-icons';
import { View, Dimensions } from 'react-native';

const formatMoney = (number) => {
    let numStr = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + numStr;
}


const getRating = (rating, starSize) => {
    const stars = [];

    // If the rating is a whole number
    if (rating % 1 === 0) {
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesome key={i} name="star" size={starSize} color="white" />);
        }
    } else {
        // If the rating is not a whole number, you can adjust the logic here
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesome key={i} name="star" size={18} color="white" />);
        }

        if (halfStar) {
            stars.push(<FontAwesome key={fullStars} name="star-half" size={18} color="white" />);
        }
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {stars}
        </View>
    );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


export { formatMoney, getRating, width, height }