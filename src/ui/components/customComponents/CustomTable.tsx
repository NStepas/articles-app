import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {
  IconButton,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

import Modal from '../addNewArticle/ModalWindow';
import { SearchComponent } from '../SearchComponent';
import { useData } from '../../../DataContext';

import { IArticle, ICustomTableProps } from '../../../models';
import {
  useDeleteArticleMutation,
  useGetOneArticleQuery,
} from '../../../slices/apiSlice';

import { theme } from '../../styles/theme';
interface EnhancedTableToolbarProps {
  numSelected: number;
  data: any;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, data: id } = props;
  const [isVisible, setIsVisible] = useState(true);
  const [articleUpdateShown, setArticleUpdateShown] = useState(false);

  const isUpdate = true;
  const token = localStorage.getItem('token');

  const {
    data: article,
    isLoading,
    isSuccess: getSuccess,
    isError: getHasError,
    error: getError,
  } = useGetOneArticleQuery(...id);

  const [deleteArticle, { isSuccess, isError, error, data }] =
    useDeleteArticleMutation();
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = article;
  } else if (isError) {
    content = <p>{error}</p>;
  }

  const showArticleUpdateHandler = () => {
    setArticleUpdateShown(true);
  };

  const hideArticleUpdateHandler = () => {
    setArticleUpdateShown(false);
  };

  const handleClick = () => {
    deleteArticle(id);
  };

  useEffect(() => {
    if (isError) {
      if (error?.data?.message) {
        toast.error(error.data.message[0], {
          position: 'bottom-left',
        });
      }
    }
  }, [isError]);

  return (
    <div className='flex w-full'>
      {token ? (
        <Toolbar className='w-full flex'>
          {numSelected > 0 && token ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color='inherit'
              variant='subtitle1'
              component='div'>
              {numSelected} selected
            </Typography>
          ) : (
            <div className='flex  justify-between'>
              <div className='flex '>
                <Typography
                  sx={{ flex: '1 1 100%' }}
                  variant='h6'
                  id='tableTitle'
                  component='div'
                  className='flex  '>
                  Articles
                </Typography>
              </div>
              <div className='ml-16'>
                <SearchComponent />
              </div>
            </div>
          )}
          {numSelected > 0 && token ? (
            <ThemeProvider theme={theme}>
              <Tooltip title='Update'>
                <IconButton onClick={showArticleUpdateHandler}>
                  <UpdateIcon color='info' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete'>
                <IconButton onClick={handleClick}>
                  <DeleteIcon color='info' />
                </IconButton>
              </Tooltip>
              {articleUpdateShown ? (
                <Modal
                  onClose={hideArticleUpdateHandler}
                  props={isUpdate}
                  article={article}
                />
              ) : null}
            </ThemeProvider>
          ) : (
            ''
          )}
        </Toolbar>
      ) : (
        <Toolbar className='w-full flex'>
          <div className='flex  '>
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant='h6'
              id='tableTitle'
              component='div'>
              Articles
            </Typography>
            <SearchComponent />
          </div>
        </Toolbar>
      )}
      <ToastContainer />
    </div>
  );
}

export const CustomTable = ({ articles }: ICustomTableProps) => {
  const [selectedItems, setSelectedItems] = useState<GridRowSelectionModel>([]);
  const [context] = useData();
  const { data, updateData } = context;
  const token = localStorage.getItem('token');

  const handleSelectionModelChange = (
    selectionModel: GridRowSelectionModel
  ) => {
    setSelectedItems(selectionModel);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'article',
      headerName: 'Article description',
      width: 500,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.description || ''}`,
    },
  ];
  const rows = [] as IArticle[];

  if (Array.isArray(data)) {
    data.map((article: IArticle) => {
      rows.push({
        id: article._id as string,
        name: article.name,
        description: article.description,
      });
    });
    updateData('');
  } else if (Array.isArray(articles) && articles.length !== 0) {
    articles.map((article: IArticle) => {
      rows.push({
        id: article._id as string,
        name: article.name,
        description: article.description,
      });
    });
  } else {
    return null;
  }

  return (
    <div className='h-full flex justify-center'>
      <div className=' flex flex-col justify-center items-center content-center'>
        <EnhancedTableToolbar
          numSelected={selectedItems.length}
          data={selectedItems}
        />
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableColumnMenu
          checkboxSelection={token ? true : false}
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </div>
    </div>
  );
};
