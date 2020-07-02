function convertToTotalTimeSeconds(minutes: string, seconds: string): number {
    return ((parseInt(minutes) * 60) + parseInt(seconds));
}