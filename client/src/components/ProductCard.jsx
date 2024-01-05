import {
  Box,
  Image,
  Badge,
  Text,
  Flex,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import { BiExpand } from "react-icons/bi";
import React, {useState} from "react";
import {
  addToFavorites,
  removeFromFavorites,
  toggleFavorites,
} from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import {Link as ReactLink} from 'react-router-dom';

const ProductCard = ({ product, loading }) => {
  const dispatch = useDispatch();
	const { favourite } = useSelector((state) => state.product);
  const [isShown, setIsShown] = useState(false);

  return (
    <Skeleton isLoaded={!loading} _hover={{ size: 1.5 }}>
      <Box
        _hover={{ transform: "scale(1.1)", transitionDuration: "0.5s" }}
        borderWidth="1px"
        overflow="hidden"
        p="4"
        shadow="md"
      >
        <Image
          onMouseEnter={()=>setIsShown(true)}
          onMouseLeave={()=>setIsShown(false)}
          src={product.images[isShown && product.images.length == 2 ? 1 : 0]}
          fallback="https://via.placeholder.com/150"
          alt={product.name}
          height="200px"
        />
        {product.stock < 5 ? (
          <Badge colorScheme="yellow">Only{product.stock}left</Badge>
        ) : product.stock < 1 ? (
          <Badge colorScheme="red">Sold out</Badge>
        ) : (
          <Badge colorScheme="green">In Stock</Badge>
        )}
        {product.productIsNew && (
          <Badge ml="2" colorScheme="purple">
            new
          </Badge>
        )}
        <Text noOfLines={1} fontSize="xl" fontWeight="semibold" mt="2">
          {product.brand} {` `} {product.name}
        </Text>

        <Text noOfLines={1} fontSize="md" color="grey.600">
          {product.subtitle}
        </Text>
        <Flex justify="space-between" alignItems="center" mt="2">
          <Badge colorScheme="cyan">{product.category}</Badge>
          <Text fontSize="xl" fontWeight="semibold" colorScheme="cyan.600">
            ${product.price}
          </Text>
        </Flex>
        <Flex justify='space-between' mt="2">
          {favourite.includes(product._id) ? (
            <IconButton
              icon={<MdOutlineFavorite size="20px" />}
              colorScheme="cyan"
              size="sm"
              onClick={() => dispatch(removeFromFavorites(product._id))}
            />
          ) : (
            <IconButton
              icon={<MdOutlineFavoriteBorder size="20px" />}
              colorScheme="cyan"
              size="sm"
              onClick={() => dispatch(addToFavorites(product._id))}

            />
          )}
          <IconButton
            icon={<BiExpand size="20" />}
            as={ReactLink} to={`/product/${product._id}`}
            colorScheme="cyan"
            size="sm"
          />
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductCard;
