import sys

def calculate_new_dimensions(target_ratio, original_width, original_height):
    """
    Calculates new dimensions to fit a target aspect ratio,
    cropping the original image as little as possible.
    """
    
    # Calculate the original aspect ratio
    original_ratio = original_width / original_height
    
    new_width = original_width
    new_height = original_height
    
    if target_ratio > original_ratio:
        # Target is "wider" than the original.
        # We must keep the original width and crop the height.
        new_height = original_width / target_ratio
    elif target_ratio < original_ratio:
        # Target is "narrower" than the original.
        # We must keep the original height and crop the width.
        new_width = original_height * target_ratio
    
    # Return the new dimensions as integers
    return int(round(new_width)), int(round(new_height))

def main():
    # Check if the correct number of arguments are provided
    # sys.argv[0] is the script name
    if len(sys.argv) != 4:
        print("Usage: python app.py <target_ratio> <original_width> <original_height>")
        print("Example: python app.py 0.75 1200 1800")
        sys.exit(1) # Exit with an error code

    try:
        # Parse command-line arguments
        target_ratio = float(sys.argv[1])
        original_width = int(sys.argv[2])
        original_height = int(sys.argv[3])
        
        if target_ratio <= 0 or original_width <= 0 or original_height <= 0:
            raise ValueError("Dimensions and ratio must be positive numbers.")

    except ValueError as e:
        print(f"Error: Invalid input. {e}")
        print("Please ensure ratio is a float and dimensions are integers.")
        sys.exit(1)

    # Calculate the new dimensions
    new_width, new_height = calculate_new_dimensions(target_ratio, original_width, original_height)
    
    # Print the result
    print(f"{new_width} {new_height}")

if __name__ == "__main__":
    main()
