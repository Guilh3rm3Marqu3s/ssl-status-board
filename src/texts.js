import {Referee} from "./sslProto"
import sslProto from "./sslProto"

const stageToText = new Map();
stageToText.set(Referee.Stage.NORMAL_FIRST_HALF_PRE, 'Matched to be started');
stageToText.set(Referee.Stage.NORMAL_FIRST_HALF, 'First Half');
stageToText.set(Referee.Stage.NORMAL_HALF_TIME, 'Half Time');
stageToText.set(Referee.Stage.NORMAL_SECOND_HALF_PRE, 'Second Half');
stageToText.set(Referee.Stage.NORMAL_SECOND_HALF, 'Second Half');
stageToText.set(Referee.Stage.EXTRA_TIME_BREAK, 'Break');
stageToText.set(Referee.Stage.EXTRA_FIRST_HALF_PRE, 'Extra First Time');
stageToText.set(Referee.Stage.EXTRA_FIRST_HALF, 'Extra First Time');
stageToText.set(Referee.Stage.EXTRA_HALF_TIME, 'Extra Half Time');
stageToText.set(Referee.Stage.EXTRA_SECOND_HALF_PRE, 'Extra Second Half');
stageToText.set(Referee.Stage.EXTRA_SECOND_HALF, 'Extra Second Half');
stageToText.set(Referee.Stage.PENALTY_SHOOTOUT_BREAK, 'Break');
stageToText.set(Referee.Stage.PENALTY_SHOOTOUT, 'Shootout');
stageToText.set(Referee.Stage.POST_GAME, 'Match finished');

export const mapStageToText = function (stage) {
    const text = stageToText.get(stage);
    if (text !== undefined) {
        return text;
    }
    return 'unknown stage: ' + stage;
};


const commandToText = new Map();
commandToText.set(Referee.Command.HALT, 'Game is Halted');
commandToText.set(Referee.Command.STOP, 'Game is Stopped');
commandToText.set(Referee.Command.NORMAL_START, 'Game is Running');
commandToText.set(Referee.Command.FORCE_START, 'Game is Running');
commandToText.set(Referee.Command.PREPARE_KICKOFF_YELLOW, 'Kickoff');
commandToText.set(Referee.Command.PREPARE_KICKOFF_BLUE, 'Kickoff');
commandToText.set(Referee.Command.PREPARE_PENALTY_YELLOW, 'Penalty Kick');
commandToText.set(Referee.Command.PREPARE_PENALTY_BLUE, 'Penalty Kick');
commandToText.set(Referee.Command.DIRECT_FREE_YELLOW, 'Game is Running');
commandToText.set(Referee.Command.DIRECT_FREE_BLUE, 'Game is Running');
commandToText.set(Referee.Command.INDIRECT_FREE_YELLOW, 'Game is Running');
commandToText.set(Referee.Command.INDIRECT_FREE_BLUE, 'Game is Running');
commandToText.set(Referee.Command.TIMEOUT_YELLOW, 'Timeout');
commandToText.set(Referee.Command.TIMEOUT_BLUE, 'Timeout');
commandToText.set(Referee.Command.GOAL_YELLOW, 'Goal');
commandToText.set(Referee.Command.GOAL_BLUE, 'Goal');
commandToText.set(Referee.Command.BALL_PLACEMENT_YELLOW, 'Ball Placement');
commandToText.set(Referee.Command.BALL_PLACEMENT_BLUE, 'Ball Placement');

export const mapCommandToText = function (command) {
    const text = commandToText.get(command);
    if (text !== undefined) {
        return text;
    }
    return 'unknown command: ' + command;
};


const oppositeTeam = function (team) {
    if (team === sslProto.Team.BLUE) {
        return sslProto.Team.YELLOW;
    } else if (team === sslProto.Team.YELLOW) {
        return sslProto.Team.BLUE;
    }
    return 'Unknown;';
};

const formatTeam = function (team) {
    if (team === sslProto.Team.BLUE) {
        return '<span class="team-blue">Blue</span>';
    } else if (team === sslProto.Team.YELLOW) {
        return '<span class="team-yellow">Yellow</span>';
    }
    return 'Unknown;';
};

const teamAndBot = function (event) {
    if (event.byTeam === undefined) {
        return '';
    }
    if (event.byBot === undefined || !event.hasOwnProperty('byBot')) {
        return formatTeam(event.byTeam);
    }
    return formatTeam(event.byTeam) + ' ' + event.byBot;
};

const radToDeg = function (rad) {
    return Math.ceil(rad * 180 / Math.PI) + '°';
};

const velocity = function (v) {
    return Number(Math.ceil(v * 10) / 10).toFixed(1) + 'm/s';
};

const distance = function (v) {
    return Number(Math.ceil(v * 100) / 100).toFixed(2) + 'm';
};

const seconds = function (v) {
    return Number(Math.ceil(v * 10) / 10).toFixed(1) + 's';
};

export const mapGameEventToText = function (event) {
    if (event.prepared != null) {
        return `Prepared after ${seconds(event.prepared.timeTaken)}`;
    }
    if (event.noProgressInGame != null) {
        return `No progress for ${seconds(event.noProgressInGame.time)}`;
    }
    if (event.placementFailed != null) {
        return `${teamAndBot(event.placementFailed)} failed placing ball `
            + ` (${distance(event.placementFailed.remainingDistance)} remaining)`;
    }
    if (event.placementSucceeded != null) {
        return `${teamAndBot(event.placementSucceeded)} placed ball successfully `
            + `over ${distance(event.placementSucceeded.distance)} `
            + `within ${seconds(event.placementSucceeded.timeTaken)} `
            + `and ${distance(event.placementSucceeded.precision)}`;
    }
    if (event.botSubstitution != null) {
        return `${teamAndBot(event.botSubstitution)} requests bot substitution`;
    }
    if (event.tooManyRobots != null) {
        return `${teamAndBot(event.tooManyRobots)} has too many robots on field`;
    }
    if (event.ballLeftFieldTouchLine != null) {
        return `${teamAndBot(event.ballLeftFieldTouchLine)} kicked ball out via touch line`;
    }
    if (event.ballLeftFieldGoalLine != null) {
        return `${teamAndBot(event.ballLeftFieldGoalLine)} kicked ball out via goal line`;
    }
    if (event.possibleGoal != null) {
        return `${teamAndBot(event.possibleGoal)} might have scored a goal`;
    }
    if (event.goal != null) {
        return `${teamAndBot(event.goal)} has scored a goal`;
    }
    if (event.indirectGoal != null) {
        return `${teamAndBot(event.indirectGoal)} performed an illegal indirect goal`;
    }
    if (event.chippedGoal != null) {
        return `${teamAndBot(event.chippedGoal)} chipped on goal`;
    }
    if (event.aimlessKick != null) {
        return `${teamAndBot(event.aimlessKick)} kicked aimlessly`;
    }
    if (event.kickTimeout != null) {
        return `${teamAndBot(event.kickTimeout)} `
            + `has not kicked within ${seconds(event.kickTimeout.time)}`;
    }
    if (event.keeperHeldBall != null) {
        return `${teamAndBot(event.keeperHeldBall)}'s keeper `
            + `held the ball for ${seconds(event.keeperHeldBall.duration)}`;
    }
    if (event.attackerDoubleTouchedBall != null) {
        return `${teamAndBot(event.attackerDoubleTouchedBall)} touched ball twice`;
    }
    if (event.attackerInDefenseArea != null) {
        return `${teamAndBot(event.attackerInDefenseArea)} was in opponent defense area`;
    }
    if (event.attackerTouchedKeeper != null) {
        return `${teamAndBot(event.attackerTouchedKeeper)} touched opponent keeper`;
    }
    if (event.botDribbledBallTooFar != null) {
        return `${teamAndBot(event.botDribbledBallTooFar)} dribbled ball too far`;
    }
    if (event.botKickedBallTooFast != null) {
        return `${teamAndBot(event.botKickedBallTooFast)} kicked ball too fast` +
            `(${velocity(event.botKickedBallTooFast.initialBallSpeed)})`;
    }
    if (event.attackerTooCloseToDefenseArea != null) {
        return `${teamAndBot(event.attackerTooCloseToDefenseArea)} too close to opponent defense area `
            + `(${distance(event.attackerTooCloseToDefenseArea.distance)})`;
    }
    if (event.botInterferedPlacement != null) {
        return `${teamAndBot(event.botInterferedPlacement)} interfered placement`;
    }
    if (event.botCrashDrawn != null) {
        return `Bot Blue ${event.botCrashDrawn.botBlue} and Yellow ${event.botCrashDrawn.botYellow} `
            + `crashed with ${velocity(event.botCrashDrawn.crashSpeed)} `
            + `@ ${radToDeg(event.botCrashDrawn.crashAngle)} `
            + `(Δ${velocity(event.botCrashDrawn.speedDiff)})`;
    }
    if (event.botCrashUnique != null) {
        return `${teamAndBot(event.botCrashUnique)} ${event.botCrashUnique.violator} `
            + `crashed into ${event.botCrashUnique.victim} `
            + `with ${velocity(event.botCrashUnique.crashSpeed)} `
            + `@ ${radToDeg(event.botCrashUnique.crashAngle)} `
            + `(Δ${velocity(event.botCrashUnique.speedDiff)})`;
    }
    if (event.botCrashUniqueSkipped != null) {
        return `Skipped: ${teamAndBot(event.botCrashUniqueSkipped)} ${event.botCrashUniqueSkipped.violator} `
            + `crashed into ${event.botCrashUniqueSkipped.victim} `
            + `with ${velocity(event.botCrashUniqueSkipped.crashSpeed)} `
            + `@ ${radToDeg(event.botCrashUniqueSkipped.crashAngle)} `
            + `(Δ${velocity(event.botCrashUniqueSkipped.speedDiff)})`;
    }
    if (event.botPushedBot != null) {
        let byTeam = event.botPushedBot.byTeam;
        let otherTeam = oppositeTeam(byTeam);
        let violator = event.botPushedBot.violator;
        let victim = event.botPushedBot.victim;
        let dist = event.botPushedBot.pushedDistance;
        let text = `Skipped: ${formatTeam(byTeam)} ${violator}`
            + ` pushed ${formatTeam(otherTeam)} ${victim}`;
        if (dist > 0) {
            text += ` over ${distance(dist)}`
        }
        return text;
    }
    if (event.botPushedBotSkipped != null) {
        let byTeam = event.botPushedBotSkipped.byTeam;
        let otherTeam = oppositeTeam(byTeam);
        let violator = event.botPushedBotSkipped.violator;
        let victim = event.botPushedBotSkipped.victim;
        let dist = event.botPushedBotSkipped.pushedDistance;
        let text = `Skipped: ${formatTeam(byTeam)} ${violator}`
            + ` pushed ${formatTeam(otherTeam)} ${victim}`;
        if (dist > 0) {
            text += ` over ${distance(dist)}`
        }
        return text;
    }
    if (event.botHeldBallDeliberately != null) {
        return `${teamAndBot(event.botHeldBallDeliberately)} `
            + `held ball deliberately for ${event.botHeldBallDeliberately.duration}`;
    }
    if (event.botTippedOver != null) {
        return `${teamAndBot(event.botTippedOver)} tipped over`;
    }
    if (event.botTooFastInStop != null) {
        return `${teamAndBot(event.botTooFastInStop)} `
            + `too fast during stop (${velocity(event.botTooFastInStop.speed)})`;
    }
    if (event.defenderTooCloseToKickPoint != null) {
        return `${teamAndBot(event.defenderTooCloseToKickPoint)} `
            + `too close to kick point (${velocity(event.defenderTooCloseToKickPoint.distance)})`;
    }
    if (event.defenderInDefenseAreaPartially != null) {
        return `${teamAndBot(event.defenderInDefenseAreaPartially)} `
            + `touched ball while partially inside own defense area `
            + `(${distance(event.defenderInDefenseAreaPartially.distance)})`;
    }
    if (event.defenderInDefenseArea != null) {
        return `${teamAndBot(event.defenderInDefenseArea)} `
            + `touched ball while fully inside own defense area `
            + `(${distance(event.defenderInDefenseArea.distance)})`;
    }
    if (event.multipleCards != null) {
        return `${teamAndBot(event.multipleCards)} collected multiple cards`;
    }
    if (event.multiplePlacementFailures != null) {
        return `${teamAndBot(event.multiplePlacementFailures)} failed ball placement repeatedly`;
    }
    if (event.multipleFouls != null) {
        return `${teamAndBot(event.multipleFouls)} collected multiple fouls`;
    }
    if (event.unsportingBehaviorMinor != null) {
        return `Unsporting behavior by ${teamAndBot(event.unsportingBehaviorMinor)}: `
            + event.unsportingBehaviorMinor.reason;
    }
    if (event.unsportingBehaviorMajor != null) {
        return `Major unsporting behavior by ${teamAndBot(event.unsportingBehaviorMajor)}: `
            + event.unsportingBehaviorMajor.reason;
    }
    return 'unknown game event';
};