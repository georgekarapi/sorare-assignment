import React, { useEffect, createRef } from 'react';
import styled from '@emotion/styled';

import { FlagIcon } from 'react-flag-kit';
import { FaSave } from 'react-icons/fa';
import html2canvas from 'html2canvas';

const Flex = styled.div`
  display: flex;
`;

const Card = ({ data }) => {
  const myRef = createRef();
  const getBg = () => {
    const endColor = (() => {
      switch (data.rarity) {
        case 'rare':
          return 'rgba(248,49,47,1)';
        case 'super-rare':
          return 'rgba(0,116,186,1)';
        case 'unique':
          return 'rgba(250,235,215,1)';
        default:
          return 'rgba(252,213,63,1)';
      }
    })();
    return `linear-gradient(145deg, rgba(0,0,0,1) 0%, rgba(30,30,30,0.5) 0%, ${endColor} 100%)`;
  };

  const downloadImage = (blob, fileName) => {
    const fakeElement = window.document.createElement('a');
    fakeElement.style = 'display:none;';
    fakeElement.download = fileName;

    fakeElement.href = blob;

    document.body.appendChild(fakeElement);
    fakeElement.click();
    document.body.removeChild(fakeElement);

    fakeElement.remove();
  };

  // Will save only available images as the CORS one won't be able to load locally
  const saveAsImage = async () => {
    const canvas = await html2canvas(myRef.current, { useCORS: true, proxy: 'https://api.sorare.com/' });
    const image = canvas.toDataURL('image/png', 1.0);
    downloadImage(image, data.slug);
  };

  return (
    <div className="card-container">
      <div ref={myRef} className="card-image" style={{ background: getBg() }}>
        <Flex style={{ width: '100%', justifyContent: 'space-between' }}>
          <div>
            <div>{data.season.name}</div>
            <b>{data.rarity.toUpperCase()}</b>
          </div>
          <div>
            <div>
              <img alt={data.team.name} src={data.team.pictureUrl} width="28" height="28" />
            </div>
            <div>
              <div className="align-center">{data.shirtNumber}</div>
            </div>
          </div>
        </Flex>
        <div className="card-details">
          <div>
            <div
              className="player-img"
              style={{ backgroundImage: `url(${data.player.pictureUrl})` }}
              src={data.player.pictureUrl}
            />
          </div>
          <div className="card-attributes">
            <div className="player-name">
              <h3>{data.player.displayName}</h3>
            </div>
            <Flex style={{ justifyContent: 'space-between', textAlign: 'center' }}>
              <div className="detail-col">
                <div>Age</div>
                <b className="detail-value">{data.age}</b>
              </div>
              <div className="detail-col">
                <div>Position</div>
                <b className="detail-value">{data.position}</b>
              </div>
              <div className="detail-col">
                <div>Country</div>
                <div className="detail-value">
                  <FlagIcon style={{ borderRadius: '100%' }} code={data.player.country.code.toUpperCase()} size={18} />
                </div>
              </div>
            </Flex>
          </div>
        </div>
      </div>
      <div title="Save as Image" className="save-button" onClick={() => saveAsImage()}>
        <FaSave size="24px" />
      </div>
    </div>
  );
};

export default Card;
