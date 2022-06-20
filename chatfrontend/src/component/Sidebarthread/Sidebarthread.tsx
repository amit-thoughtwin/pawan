import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Sidebarthread.css';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import TelegramDataService from '../../service/service';

interface IProps {
    id: string;
    friend: string;
    // timestamp: any;
}

function Sidebarthread(props: IProps) {
  const {
    friend, id,
  } = props;
  const [user, setUser] = useState({ email: '' });
  const [data, setData] = useState<any>('');
  const [msgcount, setMsgcount] = useState('');

  useEffect(() => {
    if (friend) {
      TelegramDataService.getchatuser(friend).then((res) => {
        setUser(res?.data()?.newUser);
      });
    }
  }, [friend]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'lastMsg', id), (docs: any) => {
      setData(docs.data());
    });
    return () => unsub();
  }, []);

  const getmsg = async (msid:any) => {
    const getchatdata = doc(db, 'chats', msid);
    const colRef = collection(getchatdata, 'messages');
    onSnapshot(colRef, (querySnapshot) => {
      const dataa:any = querySnapshot?.docs?.filter((docsz: any) => docsz?.data()?.isread !== true);
      setMsgcount(dataa.length);
    });
  };

  useEffect(() => {
    if (id !== undefined && id !== '') {
      getmsg(id);
    }
  }, [id]);

  return (
    <Link to={`/dash/${id}`}>
      <div className="sidebarthreads">
        <Avatar />
        <div className="sidebarthread_details">
          <h3>
            {/* {props.chatName} */}
            {user?.email}
          </h3>
          {/* <small className='sidebarThread__timestamp'>timestamp</small> */}
          {/* <small className='sidebarThread__timestamp'>{new Date(data?.createdAt?.toDate())
            .toLocaleString()}</small> */}
          {data && (
          <p className="truncate">
            <strong>{data?.uid === auth?.currentUser?.uid ? 'Me:' : null}</strong>
            {data.message}

            <small className="unseenmsg">{msgcount}</small>

            <small className="sidebarThread__timestamp">{new Date(data?.createdAt?.toDate()).toLocaleString()}</small>
          </p>
          )}

        </div>
      </div>
    </Link>
  );
}

export default Sidebarthread;
