import React, {useEffect, useState, createRef} from 'react';
import { interval, Subject,  fromEvent} from "rxjs";
import { takeUntil, debounceTime, buffer, map, filter } from "rxjs/operators";
import Button from "../../shared/components/Button";
import style from "./Timer.module.scss";
import TimerDisplay from "../TimerDisplay";



const Timer = () => {
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState("stop");
    const button = createRef();

    useEffect(() => {

        const stream$ = new Subject();
        interval(1000)
            .pipe(takeUntil(stream$))
            .subscribe(() => {
                if (status === "run") {
                    setTime(time => time + 1);
                }
            });


        // DOUBLE CLICK
        const clicks$ = fromEvent(button.current, 'click')
        const buff$ = clicks$.pipe(
            debounceTime(300),
        )

        const doubleClick = clicks$.pipe(
            buffer(buff$),
            map(list => {
                return list.length;
            }),
            filter(x => x === 2),
        );
        doubleClick.subscribe(() => {
            setStatus("pause");
        })


        return () => {
            stream$.next("subscribe");
            stream$.complete();
        };

    }, [status]);

    const startStop = React.useCallback(() => {
        console.log(status);
        if (status === "run") {
            setStatus("stop");
            setTime(0);
        } else setStatus("run");

    }, [status]);

    const reset = React.useCallback(() => {
        setTime(0);
    }, []);

    return (
        <div className={style.timer}>
            <h1 className={style.timer_header}>Timer</h1>
            <TimerDisplay time={time}/>
            <div>
                <Button
                    text={"Start / Stop"}
                    classType={"basic"}
                    handleClick={startStop}/>
                <Button
                    ref = {button}
                    text={"Wait"}
                    classType={"outline"}
                />
                <Button
                    text={"Reset"}
                    classType={"inactive"}
                    handleClick={ reset}
                />
            </div>
        </div>
    );
};

export default Timer;
