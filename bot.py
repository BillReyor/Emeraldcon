#!/usr/bin/env python3
"""Simple bot response selection script.

This script prompts the user at startup to choose which channels
(0, 1, 2, 3, or all) the bot should respond to. Direct messages (DMs)
are always responded to regardless of the configuration.
"""
from typing import Iterable, Set, Union

def prompt_channel_selection() -> Union[Set[int], str]:
    """Prompt the user for channels the bot should respond to."""
    prompt = "Respond to channels (0,1,2,3 or all): "
    choice = input(prompt).strip().lower()
    if choice == "all":
        return "all"
    selected: Set[int] = set()
    for part in choice.split(","):
        part = part.strip()
        if part.isdigit():
            num = int(part)
            if num in {0, 1, 2, 3}:
                selected.add(num)
    return selected

RESPOND_CHANNELS = prompt_channel_selection()

def should_respond(channel: int = None, is_dm: bool = False) -> bool:
    """Determine whether to respond based on configuration."""
    if is_dm:
        return True
    if RESPOND_CHANNELS == "all":
        return True
    return channel in RESPOND_CHANNELS

# Example usage (could be replaced with actual bot event loop)
if __name__ == "__main__":
    print("Example checks:")
    for ch in range(4):
        print(f"Channel {ch}:", "respond" if should_respond(channel=ch) else "ignore")
    print("DM:", "respond" if should_respond(is_dm=True) else "ignore")
