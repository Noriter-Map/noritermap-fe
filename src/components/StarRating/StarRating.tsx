import {
  HalfStar,
  Star,
  StyledContainer,
  StyledRatingText,
  StyledStarContainer,
} from "./StarRating.style";

interface RatingProps {
  ratingAvg: number;
}

export const StarRating = ({ ratingAvg }: RatingProps) => {
  const fullStars = Math.floor(ratingAvg);
  const hasHalfStar = ratingAvg % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  function formatToOneDecimalPlace(number: number) {
    return number.toFixed(1);
  }
  return (
    <StyledContainer>
      <StyledRatingText>
        {formatToOneDecimalPlace(ratingAvg)}점
      </StyledRatingText>
      <StyledStarContainer>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={`full-${index}`} filled={true} />
        ))}
        {hasHalfStar && <HalfStar key="half" />}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={`empty-${index}`} filled={false} />
        ))}
      </StyledStarContainer>
    </StyledContainer>
  );
};

export default StarRating;
