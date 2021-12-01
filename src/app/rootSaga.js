import { all } from 'redux-saga/effects';
import watchCoinSaga from '../features/data/CoinSaga';
export default function* rootSaga(){
    yield all([watchCoinSaga()]);
}