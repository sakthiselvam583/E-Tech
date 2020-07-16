import socketIOClient from 'socket.io-client';
import { ACCESS_POINT } from '../../config';

const socket = socketIOClient(ACCESS_POINT);

export default socket;
