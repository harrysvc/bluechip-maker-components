import Button from "@components/Button";
import NftCard from "@components/NftCard";
import { FilterFormProps } from "@container/Form/Filter";
import SortForm, { SortFormProps } from "@container/Form/Sort";
import FilterBar from "@container/Layout/Filter";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { nftActions } from "@stores/slices/nft";
import { theme } from "@theme";
import { RequestStatus } from "@typings/request";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  StyledContainer,
  StyledContentPage,
  StyledFilterBar,
  StyledSort,
  Title,
} from "./Marketplace.styled";
import { OpenSeaAsset } from "@typings/marketplace/opensea";

export interface MarketplaceProps {
  data: OpenSeaAsset[];
  status?: RequestStatus;
  loadedMore?: boolean;
  isPreview?: boolean;
}

const Marketplace: FC<MarketplaceProps> = ({
  data,
  status,
  loadedMore,
  isPreview,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { collection } = router.query;
  const LIMIT = 12;

  const [offset, setOffset] = useState(0);

  const initialSortValue = {
    sort: "None",
  };

  const handleChangeSort = (values: SortFormProps) => {
    console.log(values);
  };

  const handleSubmitFilter = (values: FilterFormProps): void => {
    console.log(values);
  };

  const handleLoadMore = () => {
    setOffset(offset + LIMIT + 1);
  };

  useEffect(() => {
    if (!isPreview) {
      dispatch(
        nftActions.getAssetListRequest({
          collection: collection ? String(collection) : "mintastore",
          offset,
          limit: 12,
          isLoadMore: offset > 0 && !!data?.length,
        })
      );
    }
  }, [offset, isPreview]);

  return (
    <StyledContentPage>
      <StyledContainer maxWidth="xl">
        <Title
          color={theme.palette.common.white}
          variant="h1"
          pt={10.5}
          mb={7}
          textAlign="center"
        >
          MARKETPLACE
        </Title>
        <Box>
          <Grid container spacing={4} display="flex" justifyContent="center">
            <StyledFilterBar item xs={12} md={3}>
              <FilterBar handleSubmit={handleSubmitFilter} />
            </StyledFilterBar>
            <Grid item xs={12} md={9}>
              <StyledSort
                ml="auto"
                width={276}
                mb={3}
                display="flex"
                alignItems="center"
                px={1}
              >
                <Typography
                  variant="h6"
                  color={theme.palette.primary.main}
                  flex={1}
                >
                  SORT BY :
                </Typography>
                <Box flex={2}>
                  <SortForm
                    initialValues={initialSortValue}
                    onSubmit={handleChangeSort}
                  />
                </Box>
              </StyledSort>

              {status === RequestStatus.Loading ? (
                <Box textAlign="center">
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Grid container rowSpacing={3} columnSpacing={1.25}>
                    {data?.map((card, index) => {
                      return (
                        <Grid item xs={12} md={6} lg={3} sm={6} key={index}>
                          <NftCard asset={card} />
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Box mt={3.75} mb={12.875} textAlign="center">
                    <Button
                      onClick={handleLoadMore}
                      disabled={
                        status === RequestStatus.LoadingMore || loadedMore
                      }
                      startIcon={
                        status === RequestStatus.LoadingMore && (
                          <CircularProgress size={20} />
                        )
                      }
                      height={5.5}
                      width={32}
                      color="primary"
                      variant="contained"
                    >
                      Show more
                    </Button>
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </StyledContainer>
    </StyledContentPage>
  );
};

export default Marketplace;
