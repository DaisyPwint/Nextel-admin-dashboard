import { Routes,Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import color from './core/color';
import { ConfigProvider } from 'antd';
import ProtectedRoute from './routing/ProtectedRoute';
import { Login, ResetPwd, ChangePwd, AddRoom, AddRoomType, AllRooms, Dashboard, DetailReservation, EditRoomType, OccupationHistory, OccupiedRooms, Reservations, ReservationHistory, RoomType, ChangeRoom, DetailRoomType, CompletedReservationDetail } from './pages';

const ANT_THEME = {
  token: {
    colorPrimary: color.primaryColor,
    colorLink: color.linkColor,
    colorBgHeader: color.whiteColor,
    colorBgLayout: color.bgColor,
    colorText: color.textColor,
    fontSize: 15,
    fontFamily: "Roboto",
    colorText: "#181818"
  },
  components: {
    Button: {
      primaryShadow: "none",
    },
    Input: {
      activeShadow: color.activeShadowColor,
    },
    Table: {
      headerColor: color.textColor
    }
  },
}

const App = () => {

  return (   
    <ConfigProvider theme={ANT_THEME}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPwd />} />
        <Route path="/change" element={<ChangePwd />} />
        <Route path='/' element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        {/* <Route path='/' element={<AppLayout />}> */}
          <Route index element={<Dashboard/>} />
          <Route path="add-room-type" element={<AddRoomType />}/>
          <Route path="room-type" element={<RoomType />}/>
          <Route path="room-type/:id" element={<EditRoomType />}/>
          <Route path="room-type/detail/:id" element={<DetailRoomType />}/>
          <Route path="add-room" element={<AddRoom />}/>
          <Route path="change-room" element={<ChangeRoom />}/>
          <Route path="rooms" element={<AllRooms />}/>
          <Route path="reservations" element={<Reservations />}/>
          <Route path="reservations/:id" element={<DetailReservation />}/>
          <Route path="reservations-history" element={<ReservationHistory />}/>
          <Route path="reservations-history/:id" element={<CompletedReservationDetail />    }/>
          <Route path="occupied-rooms" element={<OccupiedRooms />}/>
          <Route path="occupation-history" element={<OccupationHistory />}/>
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
