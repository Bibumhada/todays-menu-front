import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncBoundary from 'components/common/AsyncBoundary';
import * as S from './Poll.styled';
import { useGetRoom } from 'apis/query/useGetRoom';
import MenuCard from 'components/common/MenuCard/MenuCard';
import Button from 'components/common/Button/Button';
import Loading from 'pages/Loading/Loading';
import ShareBottomSheet from 'components/common/modal/ShareBottomSheet';
import icon_share from 'assets/icons/icon-share.svg';
import { roomIdData } from 'recoil/roomIdData';
import { useRecoilValue } from 'recoil';

const PollWrapper = () => {
  return (
    <AsyncBoundary errorFallback={<>...error</>} suspenseFallback={<Loading message={'오늘의 메뉴 생성중'} />}>
      <Poll />
    </AsyncBoundary>
  );
};

const Poll = () => {
  const isSharedPage = useRecoilValue(roomIdData);
  const [isModalOn, setIsModalOn] = useState<boolean>(!!isSharedPage);
  const [clickedIndexArray, setClickedIndexArray] = useState<number[]>([]);
  const navigate = useNavigate();
  const { data } = useGetRoom();
  // console.log(data);

  useEffect(() => {
    console.log(clickedIndexArray);
  }, [clickedIndexArray]);

  const handleSubmit = () => {
    // navigate(`/random-menu/${data?.data[0].id}/result`);
  };

  const handleShareClick = () => {
    setIsModalOn(true);
  };

  const handleModalClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsModalOn(false);
  };

  const handleClick = (index: number) => {
    setClickedIndexArray((prev) => {
      const updatedList = [...prev];
      const i = prev.findIndex((el) => el === index);
      if (i === -1) {
        updatedList.push(index);
      } else {
        updatedList.splice(i, 1);
      }
      return updatedList.sort((a, b) => a - b);
    });
  };

  return (
    <>
      <S.Layout>
        <S.Title>오늘 당기는 메뉴는? 🤤</S.Title>
        <S.CardUl>
          {data
            ?.slice(0, 5)
            .map((el: any, i: number) => (
              <MenuCard
                key={i}
                information={{ restaurantId: el.id, index: i, title: el.title, category: el.category, link: el.link, distance: el.distance }}
                isPoll={true}
                handleClick={handleClick}
              ></MenuCard>
            ))}
        </S.CardUl>
        <S.ButtonLayout>
          <Button onClick={handleShareClick} $style={{ width: '25%' }}>
            <S.ShareImg src={icon_share} alt="공유하기 버튼" />
          </Button>
          <Button $variant={'orange'} onClick={handleSubmit}>
            투표 공유하기
          </Button>
        </S.ButtonLayout>
      </S.Layout>
      {/* 모달은 포탈 써서 전역으로 나중에 바꿀게요!! */}
      {isModalOn && <ShareBottomSheet handleModalClose={handleModalClose} />}
    </>
  );
};

export default PollWrapper;
