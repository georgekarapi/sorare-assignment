import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from './Card';

const Cards = () => {
  let { slugs } = useParams();
  const [cards, setCards] = useState([]);
  const [fetchCards, setfetchCards] = useState(false);

  const getCardsQuery = (cards) => {
    return `{
	  cards(slugs: ${JSON.stringify(cards)}) {
        id,
		name,
        slug,
		rarity,
        player {
            displayName,
            pictureUrl,
            country {
              code
            }
        },
		season {
		    name
		}
		team
		  {
			... on TeamInterface {
			  name,
              pictureUrl
		  }
		},
		shirtNumber,
		age,
		position
	  }
	}`;
  };

  useEffect(() => {
    if (slugs && fetchCards) {
      let temp = slugs.split(',');
      axios
        .post('/graphql', {
          query: getCardsQuery(temp),
        })
        .then((p) => setCards(p.data.data.cards))
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          }
        });
    }
  }, [slugs, fetchCards]);
  return (
    <div style={{ margin: 'auto', width: '80%' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Cards</h1>
      </div>
      <div className="container">
        {fetchCards ? (
          cards && cards.map((c) => <Card key={c.id} data={c} />)
        ) : (
          <button className="button-4" onClick={() => setfetchCards(true)}>
            Reveal photos
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
