// src/layouts/full/vertical/sidebar/NavGroup/NavGroup.tsx
import { ListSubheader, styled } from '@mui/material';
import { IconDots } from '@tabler/icons-react';
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
  hideMenu: string | boolean;
  t: (key: string) => string;
}

const NavGroup = ({ item, hideMenu, t }: ItemType) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  
  const ListSubheaderStyle = styled((props: any) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: customizer.activeMode === 'dark' 
        ? theme.palette.text.secondary 
        : theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );

  return (
    <ListSubheaderStyle>
      {hideMenu ? <IconDots size="14" /> : t(item?.subheader || '')}
    </ListSubheaderStyle>
  );
};

export default NavGroup;
